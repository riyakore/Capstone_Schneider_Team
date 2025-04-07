function Header({ currentUser, setCurrentUser }) {

    const handleUserChange = (e) => {
        setCurrentUser(e.target.value);
    };

    return (
        <div>
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

            {/* This is the user switch area */}
            <div className="flex items-end justify-end p-3 border-t-grey-100 border-t-4" >
            <label className="mr-2 font-semibold">Current User:</label>
                <select value={currentUser} onChange={handleUserChange} className="border border-gray-300 rounded px-2">
                    <option value="u1">u1 (Alice)</option>
                    <option value="u2">u2 (Bob)</option>
                </select>
            </div>
        </div>
    );
}

export default Header;