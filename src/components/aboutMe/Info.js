import self from "./self.png"

export let colors = ["rgb(0,255,164)", "rgb(166,104,255)"];

export const info = {
    firstName: "Devendra",
    lastName: "Dhare",
    position: "a Full Stack Web Developer",
    selfPortrait: self, // don't change this unless you want to name your self-portrait in the "img" folder something else!
    gradient: `-webkit-linear-gradient(135deg, ${colors})`,
    // baseColor: colors[0],   
    miniBio: [
        {
            emoji: '☕',
            text: 'fueled by coffee'
        },
        {
            emoji: '🌎',
            text: 'based in the MP India'
        },
        {
            emoji: "💼",
            text: "MERN developer"
        },
        {
            emoji: "📧",
            text: "devendrdhare@gmail.com"
        }
    ],
    socials: [
        // {
        //     link: "https://facebook.com",
        //     icon: 'fa fa-facebook',
        //     label: 'facebook'
        // },
        {
            link: "https://www.instagram.com/devendra_dhare22/",
            icon: 'fa fa-instagram',
            label: 'instagram'
        },
        {
            link: "https://github.com/devendradhare",
            icon: "fa fa-github",
            label: 'github'
        },
        {
            link: "https://www.linkedin.com/in/devendra-dhare-bbb214221/",
            icon: "fa fa-linkedin",
            label: 'linkedin'
        },
        // {
        //     link: "https://twitter.com",
        //     icon: "fa fa-twitter",
        //     label: 'twitter'
        // }
    ],
    // portfolio: [ // This is where your portfolio projects will be detailed
    //     {
    //         title: "Project 1",
    //         live: "https://paytonpierce.dev", //this should be a link to the live version of your project, think github pages, netlify, heroku, etc. Or your own domain, if you have it.
    //         source: "https://github.com/paytonjewell", // this should be a link to the **repository** of the project, where the code is hosted.
    //         image: mock1
    //     },
    //     {
    //         title: "Project 2",
    //         live: "https://paytonpierce.dev",
    //         source: "https://github.com/paytonjewell",
    //         image: mock2
    //     },
    //     {
    //         title: "Project 3",
    //         live: "https://paytonpierce.dev",
    //         source: "https://github.com/paytonjewell",
    //         image: mock3
    //     },
    //     {
    //         title: "Project 4",
    //         live: "https://paytonpierce.dev",
    //         source: "https://github.com/paytonjewell",
    //         image: mock4
    //     },
    //     {
    //         title: "Project 5",
    //         live: "https://paytonpierce.dev",
    //         source: "https://github.com/paytonjewell",
    //         image: mock5
    //     }
    // ]
}