import {ref} from 'vue';

// Data / Ref
export const setting = ref({
    theme_scheme: 'light',
    theme_scheme_direction: 'ltr',
    // theme_color: '',
    sidebar_color: '',
    sidebar_type: [],
    sidebar_menu_style: '',
    app_name: 'Hope UI',
    page_layout: 'container-fluid',
    theme_style_appearance: [],
    theme_font_size: 'theme-fs-md',
    header_navbar: 'default',

    scrollHeight: document.documentElement.scrollHeight
})

export const selected = ref('menu_slide')
export const menu_active = ref('index');
export const open = ref(false);
export const toggleProfileIcon = ref(false);



export const appName = ref('BACKOFFICE');

// Functions
/**
 * @function sidebarMini
 * Call toggleMiniSidebar function to toggle sidebar
 * Appelle la fonction toggleMiniSidebar
 */
export const sidebarMini = () => {
    if (setting.value.sidebar_type.includes('sidebar-mini')) {
        toggleMiniSidebar(true)
    } else {
        toggleMiniSidebar(false)
    }
}

/**
 * @function resize
 * Resize sidebar from Window size
 *
 */
export const resize = (e) => {
    toggleMiniSidebar(true)
    if (window.innerWidth < 1199.98) {
        toggleMiniSidebar(false)
    }
}

/**
 * @function toggleMiniSidebar
 * Toggle sidebar
 */
export const toggleMiniSidebar = (value) => {
    if (value) {
        const indexOf = setting.value.sidebar_type.findIndex(x => x == 'sidebar-mini')
        setting.value.sidebar_type.splice(indexOf, 1)
    } else {
        setting.value.sidebar_type.push('sidebar-mini')
    }
}

/**
 * @function toggle
 * Toggle sidebar item and set active item
 * @param {String} item Item selected on the sidebar
 */
export const toggle = (item) => {
    menu_active.value = item;
    console.log(item);

    if (item === selected.value && item.includes('.')) {
        const menu = selected.value.split('.')
        selected.value = menu[menu.length - 2];
        return;
    }

    if (item !== selected.value && selected.value.includes(item)) {
        selected.value = '';
        return;
    }
    if (item !== selected.value) {
        selected.value = item;
        return;
    }
    if (item === selected.value) {
        selected.value = '';
    }
}