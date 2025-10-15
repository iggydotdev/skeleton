import {components as homeComponents} from './pages/home.js';
import {components as blogPostComponents} from './pages/blogPost.js';

// We need some routes for testing
export const routes = [
    {
        name: 'Home',
        pattern: new URLPattern({pathname: '/'}),
        url: '/',
        meta: { title: 'Home'},
        template: 'home', // component?
        guards: [],
        components: homeComponents // if template is blank, we can compose the page with components
    }, 
    {
        pattern: new URLPattern({ pathname: '/blog/:postid' }),
        meta: { title: 'Blog Post'},
        template: 'articlePage',
        guards: [],
        components: blogPostComponents,
        externalData: async () => {
           const url = 'https://yesno.wtf/api'

            try {
                const response = await fetch(url);
                if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
                }

                const result = await response.json();
                return result;
            } catch (error) {
               throw new Error(`Error to retrieve data (${url}): ${error.message}`);
            }
        }
    },
]
