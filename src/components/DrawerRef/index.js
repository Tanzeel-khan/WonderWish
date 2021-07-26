export default class DrawerRef {
    static drawerRef = null;

    static getRef = (ref) => {
        DrawerRef.drawerRef = ref
    }

    static closeDrawer = () => {
        if (DrawerRef.drawerRef) {
            DrawerRef.drawerRef._root.close()
        }
    }
    static openDrawer = () => {
        if (DrawerRef.drawerRef) {
            DrawerRef.drawerRef._root.open()
        }
    }
}