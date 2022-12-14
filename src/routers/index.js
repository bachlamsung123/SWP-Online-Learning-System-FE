
import Admin from '../pages/Admin/Admin';
import Blog from '../pages/Blog/View';
import CreateCourse from '../pages/Expert/CreateCourse';
import EditCourse from '../pages/Expert/EditCourse';
import Expert from '../pages/Expert/Expert';
import Feedback from '../pages/Expert/Feedback';
import MyCourse from '../pages/Expert/CreatedList';
import Question from '../pages/Expert/Question';
import Home from '../pages/Home/Home'
import Login from '../pages/Guest/Login/Login';
import Profile from '../pages/User/Profile/Profile';
import Register from '../pages/Guest/Register/Register';
import Unauthorized from '../pages/Error/Unauthorized';
import ChangePassword from '../pages/User/ChangePassword/ChangePassword';
import Courses from '../pages/Courses/View';
import CreatePost from '../pages/Blog/CreatePost';
import CourseDetail from '../pages/Courses/View/CourseDetail';
import Staff from '../pages/Staff';
import Categories from '../pages/Staff/Categories';
import MyCourses from '../pages/User/MyCourses';
import PricePackage from '../pages/Staff/PricePackage';
import Learn from '../pages/Courses/Learn';
import DoQuiz from '../pages/Courses/DoQuiz';
import Purchase from '../pages/Purchase/Purchase';
import Active from '../pages/Guest/Active/Active';
import PostContent from '../pages/Blog/PostContent/PostContent';
import MyPost from '../pages/User/MyPost/MyPost';
import Pay from '../pages/Purchase/Pay';
import MyPurchase from '../pages/User/MyPurchase/MyPurchase';

const publicRoutes = [
   { path: '/', component: Home },
   { path: '/login', component: Login },
   { path: '/register', component: Register },
   { path: '/unauthorized', component: Unauthorized },
   { path: '/blog', component: Blog },
   { path: '/post/:id', component: PostContent },
   { path: '/courses', component: Courses },
   { path: '/courses/detail/:courseId', component: CourseDetail },
   { path: '/purchase', component: Purchase },
   { path: '/activate', component: Active }

]

const adminRoutes = [
   { path: '/admin', component: Admin }
]

const expertRoutes = [
   { path: '/expert', component: Expert },
   { path: '/expert/create', component: CreateCourse },
   { path: '/expert/course/:page', component: MyCourse },
   { path: '/expert/feedback', component: Feedback },
   { path: '/expert/question', component: Question },
   { path: '/expert/course/edit/:courseId', component: EditCourse }

]

const staffRoutes = [
   { path: '/staff', component: Staff },
   { path: '/staff/categories', component: Categories },
   { path: '/staff/package', component: PricePackage }
]

const privateRoutes = [
   { path: '/profile', component: Profile },
   { path: '/changePassword', component: ChangePassword },
   { path: '/write', component: CreatePost },
   { path: '/myCourses', component: MyCourses },
   { path: '/course/:courseId/learn', component: Learn },
   { path: '/course/:courseId/learn/:lessonId', component: Learn },
   { path: '/doquiz/:lessonId', component: DoQuiz },
   { path: '/myPost', component: MyPost },
   { path: '/pay/:packId', component: Pay },
   { path: '/myPurchase', component: MyPurchase }
]


export { publicRoutes, privateRoutes, adminRoutes, expertRoutes, staffRoutes };