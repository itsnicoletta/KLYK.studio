import { createRouter, createWebHistory } from 'vue-router'

// Importa le tue view principali
import Home from './views/Home.vue'
import About from './views/About.vue'
import ProjectDetail from './views/ProjectDetail.vue'
import Projects from './views/Projects.vue'
import Contacts from './views/Contacts.vue'
import ServicesDetail from './views/ServicesDetail.vue'
import QuickAudit from './views/QuickAudit.vue'
import OtherServicesDetails from './views/OtherServicesDetails.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/projects/:slug', //  route dinamica per i progetti
        name: 'ProjectDetail',
        component: ProjectDetail
    },
    {
        path: '/projects',
        name: 'Projects',
        component: Projects
    },
    {
        path: '/services/:slug',
        name: 'ServicesDetail',
        component: ServicesDetail
    },
    {
        path: '/other-services/:slug',
        name: 'OtherServicesDetails',
        component: OtherServicesDetails
    },
    {   
        path: '/contacts',
        name: 'Contacts',
        component: Contacts
    },
    {
        path: '/quick-audit',
        name: 'QuickAudit',
        component: QuickAudit
    }

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        // Torna sempre in alto quando cambi pagina
        return { top: 0 }
    }
})

export default router
