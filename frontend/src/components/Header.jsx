import { Fragment } from "react";
import { useState, useEffect } from "react";

function Header({ currentUser, setCurrentUser }) {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUsers() {
        try {
            const res  = await fetch("http://localhost:8000/api/users/");
            const json = await res.json();
            setUsers(json);
        } catch (err) {
            console.error("Failed to fetch users", err);
        } finally {
            setLoading(false);
        }
        }
        loadUsers();
    }, []);

    const renderLabel = (u) =>
        `${u.userid} (${u.first_name ?? u.username ?? "—"})`;

    return (
        <div>
        {/* top logo row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between p-2 sm:p-3 relative">
            <img
                src="/images/logo.png"
                className="w-3xs h-6 sm:h-12 mb-1 sm:mb-0 hover:cursor-pointer hover:scale-105 duration-100"
                onClick={() => (window.location.href = "https://schneider.com/")}
            />
            {/* Title: centered below logo on mobile, absolutely centered on desktop */}
            <h1
                className="text-primary font-extrabold text-lg sm:text-3xl hover:cursor-pointer hover:scale-105 duration-100 whitespace-nowrap mt-1 sm:mt-0
                sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2"
                onClick={() => window.location.reload()}
            >
                Freight Wizard
            </h1>
        </div>
    
        {/* user selector */}
        <div className="flex items-end justify-end p-2 sm:p-3 border-t-4 border-grey-100">
            <label className="mr-2 text-xs sm:text-base font-semibold">Current User:</label>
    
            <select
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
            className="border border-gray-300 rounded px-2 text-xs sm:text-base disabled:opacity-60 max-w-[150px] sm:max-w-none"
            disabled={loading || users.length === 0}
            >
            {/* fallback while loading */}
            {loading && <option>Loading…</option>}
    
            {/* once data is in */}
            {users.map((u) => (
                <option key={u.userid} value={u.userid}>
                {renderLabel(u)}
                </option>
            ))}
            </select>
        </div>
        </div>
    );
}

export default Header;