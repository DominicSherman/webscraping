import rp from 'request-promise';
import $ from 'cheerio';

const getTime = (times, i) => {
    if (times[`${i / 2}`].children[0].data) {
        return [times[`${i / 2}`].children[0].data];
    }

    const date = new Date(times[`${i / 2}`].children[0].attribs['data-date']);

    return [date.toLocaleDateString(), date.toLocaleTimeString()];
};


export const getData = async (url) => {
    return rp(url)
        .then((html) => {
            const names = $('span.short-name', html);
            const homeScores = $('span.score.icon-font-after', html);
            const awayScores = $('span.score.icon-font-before', html);
            const times = $('span.game-time', html);
            const scrapedLogos = $('img.team-logo', html);

            let logos = [];

            for (let j = 1; j < scrapedLogos.length - 1; j = j + 2) {
                logos = [...logos, scrapedLogos[j].attribs.src];
            }

            let matches = [];

            for (let i = 0; i < names.length/2; i = i + 2) {
                matches = [...matches, {
                    home: names[`${i}`].children[0].data,
                    away: names[`${i + 1}`].children[0].data,
                    homeScore: homeScores[`${i / 2}`].children[0].data,
                    awayScore: awayScores[`${i / 2}`].children[0].data,
                    homeLogo: logos[i],
                    awayLogo: logos[i + 1],
                    time: getTime(times, i)
                }];
            }

            return matches;
        })
};