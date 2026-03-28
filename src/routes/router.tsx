import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Analytics from "../pages/AnaLytics/Analytics";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import Login from "../pages/Auth/Login";
import BoostedListing from "../pages/Boosted/BoostedListing";
import ContentMod from "../pages/Content/ContentMod";
import Dashboard from "../pages/Dashboard/Dashboard";
import EventDetails from "../pages/Listing/EventDetails";
import EventPage from "../pages/Listing/Listing";
import Notification from "../pages/Notification/Notification";
import SettginsPage from "../pages/SettingsPage/SettginsPage";
import UserManagement from "../pages/UserManagement/UserManagement";
import Verification from "../pages/Verification/Verification";




export const router = createBrowserRouter([
    {
        path: "/",
        Component: Login,
    },
    {
        path: "/dashboard",
        Component: MainLayout,
        // element: <PrivetRoutes>
        //     <MainLayout></MainLayout>
        // </PrivetRoutes>,
        children: [
            {
                // index: true,
                path: "/dashboard",
                Component: Dashboard,
            },
            {
                path: "user",
                Component: UserManagement,
            }, {
                path: "add-event",
                Component: EventPage
            }
            , {
                path: "/dashboard/add-event/event-details/:id",
                Component: EventDetails
            }, {
                path: "verification",
                Component: Verification
            }, {
                path: "content",
                Component: ContentMod
            }, {
                path: "boosted",
                Component: BoostedListing
            }, {
                path: "notification",
                Component: Notification
            }, {
                path: "analytics",
                Component: Analytics
            }, {
                path: "settings",
                Component: SettginsPage
            }
        ],
    }
    , {
        path: "forgetpass",
        Component: ForgetPassword
    }
]);
