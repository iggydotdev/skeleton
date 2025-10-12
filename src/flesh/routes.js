
// We need some routes for testing
export const routes = [{
    name: 'Home',
    pattern: new URLPattern({pathname: '/'}),
    url: '/',
    meta: { title: 'Home'},
    template: 'home', // component?
    //template could also be a function for lazy loading but also for compose the page on the fly
    // () => import('./pages/home/home.show.js').then(module => module.show()),
    components: [
        {
            type: 'organism',
            name: 'header',
            props: {
                slot: [
                    {
                        type: 'atom',
                        name: 'link',
                        props: { 
                            slot: 'Home', 
                            url: '/'
                        }
                    },
                    { 
                        type: 'atom',
                        name: 'link',
                        props: { 
                            slot: 'About', 
                            url: '/about'
                        },
                    },
                    { 
                        type: 'atom',
                        name: 'link',
                        props: { 
                            slot: 'Blog', 
                            url: '/blog'
                        },
                    },
                    { 
                        type: 'atom',
                        name: 'link',
                        props: { 
                            slot: 'Contact', 
                            url: '/contact'
                        },
                    },
                ]
            }  
        },
        {
            type: 'organism',
            name: 'hero',
            props: {
                attrs: 'id="main-hero"',
                cxs: 'main-hero',
                slot: [
                    {
                        type: 'atom',
                        name: 'text',
                        props: {
                            is: 'h1',
                            slot: 'Welcome to Flesh Framework',
                        }
                    },
                    {
                        type: 'atom',
                        name: 'text',
                        props: {
                            is: 'p',
                             slot: 'Build modern web applications with ease'
                        }
                    },                  
                    {
                        type: 'atom',
                        name: 'image',
                        props: {
                            src: 'https://picsum.photos/1200/400',
                            alt: 'Hero Image'
                        }
                    },
                    {
                    type: 'atom',
                    name: 'link',
                    props: {
                        url: '/get-started',
                        slot: 'Get Started',
                    }
                },
                ]
            }
        }, 
        {
        type: 'organism',
        name: 'cta',
        props: {
            slot: [
                {
                    type: 'atom',
                    name: 'text',
                    props: {
                        is: 'h2',
                        slot: 'Ready to Dive In?',
                    }
                },
                {
                    type: 'atom',
                    name: 'text',
                    props: {
                        is: 'p',
                        slot: 'Join us today and start building amazing web experiences!',
                    }
                },            
                
                {
                    type: 'atom',
                    name: 'link',
                    props: {
                        url: '/sign-up',
                        slot: 'Sign Up Now',
                    }
                },
            ]
        }
        }, 
        {
            type: 'organism',
            name: 'footer',
            props: {
                slot: [
                    {
                        type: 'atom',
                        name: 'text',
                        props: {
                            is: 'p',
                            slot: ['© 2024 Flesh Framework. All rights reserved.']
                        }
                    }
                ]
            }
        }
    ], // if template is blank, we can compose the page with components
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
