import React, {MutableRefObject} from 'react';
import {DrawerActions, NavigationContainerRef} from '@react-navigation/native';

/**
 * In order to navigate out of the independent navigationStack in the DrawerContent/Sidebar to the tabNavigator
 * e.g <NavigationContainer independent>
 * it is necessary to make a global binding to the ref of the root navigationContainer.
 * This happens only once at init of Navigation.
 */

export const rootNavigatorRef: MutableRefObject<NavigationContainerRef | null> =
  React.createRef();

/**
 * Same for the sidebar navigator, to be able to manipulate the sidebarNavigator from the rootNavigator.
 * This is important to reset the sidebar navigationpoint on openDrawer to start from initial page.
 * For this it is necessary to make a global binding to the ref of the sidebar navigationContainer.
 * This happens only once at init of Navigation.
 */

export const closeDrawer = () => {
  rootNavigatorRef.current?.dispatch(DrawerActions.closeDrawer());
};

export const openDrawer = () => {
  rootNavigatorRef.current?.dispatch(DrawerActions.openDrawer());
};
