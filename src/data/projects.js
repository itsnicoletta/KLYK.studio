import cover1 from './projectsAssets/project1_cover.png'
import img1_1 from './projectsAssets/project1_1.png'
import img1_2 from './projectsAssets/project1_2.png'
import img1_3 from './projectsAssets/project1_3.png'
import vid1 from './projectsAssets/project1_video.mp4'

export const projects = [
    {
        id: 1,
        slug: 'lost-in-light-immersive-experience',
        title: 'Lost in Light',
        H2: 'An interactive and immersive web-based experience exploring light and perception.',
        shortDescription:
            'A narrative-driven digital experience that blends motion, sound, and interactivity to explore the relationship between humans and light.',
        description: `Lost in Light is an experimental web project that invites users to explore the boundaries between light and darkness through motion, sound, and interaction. 
    The experience was designed to evoke emotion and curiosity, using WebGL and storytelling techniques to guide the user through an immersive journey. 
    Every scene reacts dynamically to the user's movements, creating a sense of flow and discovery.`,
        secondDescription: `The project was built using Spline for 3D modeling and Vue.js for the web framework, ensuring a smooth and engaging user experience.
    The sound design plays a crucial role in enhancing the atmosphere, with ambient sounds that evolve as users navigate through different environments.
    Lost in Light aims to challenge traditional web experiences by merging art, technology, and storytelling into a cohesive and captivating journey.`,
        skills: ['spline', 'Vue.js', 'UX/UI Design', 'Motion Design'],
        coverImage: cover1,
        galleryImages: [
            img1_1,
            img1_2,
            img1_3
        ],
        video: vid1,
        link: 'https://lostinlight.netlify.app/'
    },
    {
        id: 2,
        slug: 'project-2-slug',
        title: 'Project 2 Title',
        H2: 'Project 2 Subtitle',
        shortDescription:
            'A brief description of Project 2.',
        description: `A detailed description of Project 2, explaining its purpose, features, and technologies used.`,       
        skills: ['Skill A', 'Skill B', 'Skill C'],
        coverImage: '/path/to/project2_cover.png',
        galleryImages: [
            '/path/to/project2_img1.png',
            '/path/to/project2_img2.png'
        ],
        video: '/videos/project2-demo.mp4',
        link: 'https://project2link.com'
    },
];

