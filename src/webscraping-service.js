import rp from 'request-promise';
import $ from 'cheerio';

const url = 'http://www.espn.com/soccer/team/_/id/9723';

export const getData = () => {
    rp(url)
        .then((html) => {
            const names = $('span.short-name', html);

            console.log('names', names);
            let matches = [];
            names.forEach((n, index) => {
                if (index % 2 === 1) {
                    console.log('n.children.data', n.children.data);
                }
            });
        })
};