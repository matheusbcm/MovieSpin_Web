// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Film, Home, User, LogIn } from 'lucide-react';

// const Navigation = () => {
//   const pathname = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navItems = [
//     { path: '/', name: 'Home', icon: Home },
//     { path: '/profile', name: 'Profile', icon: User },
//     { path: '/login', name: 'Login', icon: LogIn },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-cinema-dark/95 backdrop-blur-md border-b border-cinema-purple/30">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2 group">
//             <Film className="w-8 h-8 text-cinema-gold transition-transform duration-300 group-hover:scale-110" />
//             <span className="font-montserrat font-bold text-xl text-cinema-gold uppercase tracking-wide">
//               CineRoulette
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map(item => {
//               const Icon = item.icon;
//               const isActive = pathname === item.path;

//               return (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-montserrat font-medium uppercase tracking-wide text-sm ${
//                     isActive
//                       ? 'bg-cinema-gold text-cinema-dark'
//                       : 'text-cinema-white hover:text-cinema-gold hover:bg-cinema-purple/20'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden flex flex-col space-y-1 w-6 h-6"
//           >
//             <span
//               className={`block h-0.5 bg-cinema-gold transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
//             />
//             <span
//               className={`block h-0.5 bg-cinema-gold transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
//             />
//             <span
//               className={`block h-0.5 bg-cinema-gold transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
//             />
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t border-cinema-purple/30">
//             {navItems.map(item => {
//               const Icon = item.icon;
//               const isActive = pathname === item.path;

//               return (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 font-montserrat font-medium uppercase tracking-wide text-sm ${
//                     isActive
//                       ? 'bg-cinema-gold text-cinema-dark'
//                       : 'text-cinema-white hover:text-cinema-gold hover:bg-cinema-purple/20'
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navigation;
