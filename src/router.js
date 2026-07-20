import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import ProjectDetail from './views/ProjectDetail.vue'
import Projects from './views/Projects.vue'
import Contacts from './views/Contacts.vue'
import ServicesDetail from './views/ServicesDetail.vue'
import QuickAudit from './views/QuickAudit.vue'
import OtherServicesDetails from './views/OtherServicesDetails.vue'
import { defaultLocale, localizedPath, pagePaths } from './i18n'

const localizedRoutes = [
    ...['it', 'en'].flatMap((locale) => [
        { path: localizedPath(locale, 'home'), name: `Home-${locale}`, component: Home, meta: { page: 'home', locale } },
        { path: localizedPath(locale, 'about'), name: `About-${locale}`, component: About, meta: { page: 'about', locale } },
        { path: localizedPath(locale, 'projects'), name: `Projects-${locale}`, component: Projects, meta: { page: 'projects', locale } },
        { path: localizedPath(locale, 'contacts'), name: `Contacts-${locale}`, component: Contacts, meta: { page: 'contacts', locale } },
        { path: localizedPath(locale, 'quickAudit'), name: `QuickAudit-${locale}`, component: QuickAudit, meta: { page: 'quickAudit', locale } },
        { path: `/${locale}/${pagePaths.projectDetail[locale]}/:slug`, name: `ProjectDetail-${locale}`, component: ProjectDetail, meta: { page: 'projectDetail', locale } },
        { path: `/${locale}/${pagePaths.services[locale]}/:slug`, name: `ServicesDetail-${locale}`, component: ServicesDetail, meta: { page: 'services', locale } },
        { path: `/${locale}/${pagePaths.otherServices[locale]}/:slug`, name: `OtherServicesDetails-${locale}`, component: OtherServicesDetails, meta: { page: 'otherServices', locale } },
    ]),
]

const legacyRedirects = [
    { path: '/projects', redirect: localizedPath(defaultLocale, 'projects') },
    { path: '/contacts', redirect: localizedPath(defaultLocale, 'contacts') },
    { path: '/contact', redirect: localizedPath(defaultLocale, 'contacts') },
    { path: '/about', redirect: localizedPath(defaultLocale, 'about') },
    { path: '/quick-audit', redirect: localizedPath(defaultLocale, 'quickAudit') },
    { path: '/projects/:slug', redirect: (to) => localizedPath(defaultLocale, 'projectDetail', { slug: to.params.slug }) },
    { path: '/services/:slug', redirect: (to) => localizedPath(defaultLocale, 'services', { slug: to.params.slug }) },
    { path: '/other-services/:slug', redirect: (to) => localizedPath(defaultLocale, 'otherServices', { slug: to.params.slug }) },
]

const routes = [
    { path: '/', redirect: localizedPath(defaultLocale, 'home') },
    ...legacyRedirects,
    ...localizedRoutes,
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

router.afterEach((to) => {
    const locale = to.meta.locale || defaultLocale
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('klyk-locale', locale)
    }
})

export default router
