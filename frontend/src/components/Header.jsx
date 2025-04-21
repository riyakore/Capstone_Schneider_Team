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
        <div className="flex items-center justify-between p-3">
            <img
            src="/images/logo.png"
            className="w-3xs h-12 hover:cursor-pointer hover:scale-105 duration-100"
            onClick={() => (window.location.href = "https://schneider.com/")}
            />
            <h1
            className="absolute left-1/2 transform -translate-x-1/2 text-primary
                        font-extrabold text-3xl hover:cursor-pointer hover:scale-105
                        duration-100"
            onClick={() => window.location.reload()}
            >
            Freight Wizard
            </h1>
        </div>
    
        {/* user selector */}
        <div className="flex items-end justify-end p-3 border-t-4 border-grey-100">
            <label className="mr-2 font-semibold">Current User:</label>
    
            <select
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
            className="border border-gray-300 rounded px-2 disabled:opacity-60"
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