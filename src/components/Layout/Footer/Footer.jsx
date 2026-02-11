const Footer = () => {
    return (
        <footer className="w-full border-t border-slate-200 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 text-xs text-slate-500">

                <p>
                    © 2026 <span className="font-medium text-slate-600">ShopEase CMS</span>. All rights reserved.
                </p>

                <div className="flex gap-4">
                    <span className="hover:text-indigo-600 cursor-pointer">
                        Privacy
                    </span>
                    <span className="hover:text-indigo-600 cursor-pointer">
                        Terms
                    </span>
                    <span className="text-slate-400">
                        v1.0.0
                    </span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
