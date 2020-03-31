/**
 * THIS CODE WAS MADE FOR THE DSA DISCORD BOT AND CAN BE REUSED FOR ANY PURPOSE WITHOUT CREDIT. FOR FULL LEGAL AND LICENSING DISCLAIMERS, PLEASE READ LEGAL.TXT.
 * 
 * A COVID-19 information command. Scrapes data using novelcovid to gather live data regarding the virus. Also includes information regarding the virus itself.
 * 
 * ~~~developed by ggtylerr~~~
 */

const Commando = require('discord.js-commando');

const Discord = require('discord.js');
const covid = require('novelcovid');

module.exports = class COVID19Command extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'covid19',
      aliases: ['covid-19','corona'],
      group: 'cvd19',
      memberName: 'covid19',
      description: 'Information regarding COVID-19',
      details: 'Doing \'covid19 help\' will show a list of all commands regarding COVID-19.',
      args: [
        {
          key: 'cmd',
          prompt: 'This prompt shouldn\'t appear. If it does, it\'s an error, and you should contact the developers for help.',
          type: 'string',
          default: ''
        }
      ]
    });
  }
  async run(message, {cmd}) {
    // TODO: Cleanup code
    if (cmd === 'help') {
      var embed = new Discord.RichEmbed()
        .setColor('#de2812')
        .setTitle('COVID-19 Commands')
        .setAuthor('Provided by DSA Bot',global.client.user.avatarURL)
        .setDescription('All commands start with the server prefix and \'covid19\'\n(i.e. if the server prefix is \';\' you would do \';covid19\' help to get this list.)')
        .addField('help','Displays this list.')
        .addField('global','Displays the global statistics of the virus.')
        .addField('(country)','Displays the country\'s statistics of the virus. Rough JSON List: https://corona.lmao.ninja/countries')
        .addField('info','Displays resources and information regarding the virus.');
      message.channel.send(embed);
    } else if (cmd === 'info') {
      var embed = new Discord.RichEmbed()
        .setColor('#de2812')
        .setTitle('COVID-19 Information')
        .setAuthor('Provided by DSA Bot',global.client.user.avatarURL)
        .setDescription('***This section was written by a programmer, not a trained medical expert, so please do not expect full medical help regarding the virus. If you believe you need full medical advice, please skip straight to the \'important resources\' section, which is at the very bottom.***')
        .addField('TL;DR','Please do not panic over the pandemic, but don\'t act completely calm either. While many people may not die from the virus, it still needs to be addressed for the people that are affected by it. You shouldn\'t panic over this either, as nothing, if not worse will be done if fear drives us.')
        .addField('Common Misconceptions','**This is not the flu.**\nWhile the virus may share similitaries, it is not the same. The virus spreads through air and only has one virus that causes it (whereas the flu is caused by a variety of ways.) It also can cause more severe symptons, such as muscle pain, pneumonia and multi-organ failure.\n**(Anything involving a pre-existing cure)**\nThere is currently no vaccine or specific antiviral treatment for COVID-19. No, you cannot cure it with Antibiotics or Marijuana.')
        .addField('Common Misconceptions (Continued)','\n**I\'m young, this doesn\'t apply to me.**\nWhile COVID-19 has a higher death rate in older ages, that doesn\'t mean it doesn\'t apply to you. It can affect your loved ones, your community, your daily workflow, and more. A low death rate doesn\'t mean you won\'t get the effects of it, either. About 1 in every 5 people who catch it require hospital care.\n**This is too serious, I\'m freaking out**\nDon\'t. This is absolutely a serious issue, but that doesn\'t mean we should give up as a community over a microscopic circle. Take action, but do not overdo it. Doing so will cause more harm than good.')
        .addField('What you can do to prevent it','While it may seem trivial, you should wash your hands frequently, maintain distance from other people (especially anyone coughing/sneezing), and avoid touching one\'s eyes, nose and mouth. For more information, please see WHO\'s official advice: https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public')
        .addField('What do I do if I think I have it?','First, check the main symptons you\'re having. The main symptons are coughing, fever, and a shortness of breath. If you have a sore throat or a runny nose, it may be signs of a different infection. Then, call your doctor if you suspect you have it. Follow their instructions. Also, mention if you have recently travelled (especially to China, South Korea, Italy, or Japan), come into contact with a sick individual, or come into contact with animals. If you\'re tested positive, stay indoors, rest, etc. If you need to go outside, it\'s recommended you use a mask. For more information, visit https://www.wikihow.com/Identify-Coronavirus and https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks')
        .addField('How to help out','There are plenty of ways to help. If you have a loved one (or even someone locally) that is sick, offer to be their caretaker. If you have medical experience (or would like to work in the medical field), volunteer in your local hospital. If you\'re a programmer, you can make digital resources regarding the virus (or even contribute to this bot!) Even if you\'re working normally, you can still help others through motivation, petitions, and more.')
        .addField('Important Resources','CDC: https://www.cdc.gov/coronavirus/2019-ncov/index.html\nWHO: https://www.who.int/emergencies/diseases/novel-coronavirus-2019\nWorldometer: https://www.worldometers.info/coronavirus\nEmergency Numbers: https://en.wikipedia.org/wiki/List_of_emergency_telephone_numbers');
      message.channel.send(embed);
    } else {
      covid.all().then((allData) => {
        covid.countries().then((countryData) => {
          var embed;
          if (cmd === '') {
            var usa = countryData[countryData.findIndex(x => x.country === 'USA')];
            embed = new Discord.RichEmbed()
              .setColor('#de2812')
              .setTitle('COVID-19/Coronavirus Information')
              .setURL('https://www.cdc.gov/coronavirus/2019-ncov/index.html')
              .setAuthor('Provided by DSA Bot',global.client.user.avatarURL)
              .setDescription('Coronavirus disease 2019 (COVID-19) is an infectious disease caused by severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2). Common symptoms include fever, cough, and shortness of breath. Other symptoms may include muscle pain, sputum production, diarrhea, sore throat, loss of smell, and abdominal pain. While the majority of cases result in mild symptoms, some progress to pneumonia and multi-organ failure. As of 28 March 2020, the overall rate of deaths per number of diagnosed cases is 4.6 percent; ranging from 0.2 percent to 15 percent according to age group and other health problems. In comparison, the overall mortality rate of the 1918 Spanish Flu were approximately 3% to 5%')
              .addField('Global Cases','Total: ' + allData.cases + '\nActive: ' + (allData.cases - (allData.deaths + allData.recovered)) + '\nRecovered: ' + allData.recovered + '\nDeaths: ' + allData.deaths,true)
              .addField('USA Cases','Total: ' + usa.cases + '\nActive: ' + (usa.cases - (usa.deaths + usa.recovered)) + '\nRecovered: ' + usa.recovered + '\nDeaths: ' + usa.deaths + '\nCritical: ' + usa.critical + '\nCases Today: ' + usa.todayCases + '\nDeaths Today: ' + usa.todayDeaths,true)
              .setTimestamp()
              .setFooter('For more information, please do covid19 info\nFor commands relating to the virus, do covid19 help\nUpdated on:');
          } else if (cmd === 'global') {
            embed = new Discord.RichEmbed()
              .setColor('#de2812')
              .setTitle('Global Statistics on COVID-19')
              .setURL('https://www.worldometers.info/coronavirus')
              .setAuthor('Provided by DSA Bot',global.client.user.avatarURL)
              .setDescription('Total: ' + allData.cases + '\nActive: ' + (allData.cases - (allData.deaths + allData.recovered)) + '\nRecovered: ' + allData.recovered + '\nDeaths: ' + allData.deaths)
              .setTimestamp()
              .setFooter('Data scraped from corona.lmao.ninja\nUpdated on:');
          } else {
            const test = args.join(' ');
            if (!countryData.some(x => x.country.toLowerCase() === test.toLowerCase()))
              message.channel.send('Unknown country / command.');
            else {
              d8a = countryData[countryData.findIndex(x=>x.country.toLowerCase() === test.toLowerCase())];
              embed = new Discord.RichEmbed()
                .setColor('#de2812')
                .setTitle('COVID-19 ' + d8a.country + ' statistics')
                .setURL('https://www.worldometers.info/coronavirus/#countries')
                .setAuthor('Provided by DSA Bot',global.client.user.avatarURL)
                .setDescription('Total: ' + d8a.cases + '\nActive: ' + (d8a.cases - (d8a.deaths + d8a.recovered)) + '\nRecovered: ' + d8a.recovered + '\nDeaths: ' + d8a.deaths + '\nCritical: ' + d8a.critical + '\nCases Today: ' + d8a.todayCases + '\nDeaths Today: ' + d8a.todayDeaths)
                .setTimestamp()
                .setFooter('Data scraped from corona.lmao.ninja\nUpdated on:');
            }
          }
          message.channel.send(embed);
        }).catch((err) => {
          console.log(err);
          message.channel.send('An error occurred while getting country statistics.');
          message.channel.send('```' + err.message + '```');
        });
      }).catch((err) => {
        console.log(err);
        message.channel.send('An error occured while getting global statistics.');
        message.channel.send('```' + err.message + '```');
      });
    }
  }
}
