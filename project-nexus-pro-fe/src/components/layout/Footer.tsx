import { FaFacebook, FaInstagram } from 'react-icons/fa';

const navigation = {
    main: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Products', href: '#' },
        { name: 'Contact', href: '#' },
    ],
    social: [
        {
            name: 'Facebook',
            href: '#',
            icon: FaFacebook,
        },
        {
            name: 'Instagram',
            href: '#',
            icon: FaInstagram,
        },
    ],
};

function SimpleCenteredFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
                {/* Navigation Links */}
                <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
                    {navigation.main.map((item) => (
                        <div key={item.name} className="pb-6">
                            <a href={item.href} className="text-sm leading-6 text-secondary hover:text-primary transition-colors">
                                {item.name}
                            </a>
                        </div>
                    ))}
                </nav>

                {/* Social Icons */}
                <div className="mt-10 flex justify-center space-x-10">
                    {navigation.social.map((item) => (
                        <a key={item.name} href={item.href} className="text-secondary hover:text-primary transition-colors">
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                        </a>
                    ))}
                </div>

                {/* Copyright Text */}
                <p className="mt-10 text-center text-xs leading-5 text-gray-500">
                    &copy; {currentYear} Haick. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default SimpleCenteredFooter;