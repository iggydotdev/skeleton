import {components as homeComponents} from './pages/home.js';

// We need some routes for testing
export const routes = [{
    name: 'Home',
    pattern: new URLPattern({pathname: '/'}),
    url: '/',
    meta: { title: 'Home'},
    template: 'home', // component?
    //template could also be a function for lazy loading but also for compose the page on the fly
    // () => import('./pages/home/home.show.js').then(module => module.show()),
    components: homeComponents // if template is blank, we can compose the page with components
}, 
{
    pattern: new URLPattern({ pathname: '/blog/:postid' }),
    template: 'blogPost',
    meta: { title: 'Blog Post'}
},
]
/* Thinking
{
    template
    URL
    components inside only if template is blank. otherwise components are part already of the template.
    meta data., SEO, title, description, keywords, author, image, etc.
    permissions, roles, auth, ...
    layout: main, admin, dashboard, ...
    children: [] // for nested routes
}
    Objects are simpler to deal with which make also good to create things from apis. :O

*/
