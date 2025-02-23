function Header() {
    return (
        <div className="
            flex items-center justify-between p-3
        ">
            <img 
                src='/images/logo.png' 
                className="
                    w-3xs h-12 hover:cursor-pointer hover:scale-105 duration-100"
                onClick={() => location.href="https://schneider.com/"}
            />
            <h1 className="
                absolute left-1/2 transform -translate-x-1/2 
                text-primary font-extrabold text-3xl
                hover:cursor-pointer hover:scale-105 duration-100
                "
                onClick={() => window.location.reload()}>Freight Wizard</h1>
        </div>
    );
}

export default Header;