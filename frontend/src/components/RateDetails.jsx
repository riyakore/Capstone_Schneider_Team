function RateDetails({route}) {

    return (
        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mt-0">Rate Details</h2>
            <table className="w-full border-collapse mt-4">
            <thead>
                <tr>
                <th className="text-left p-2 border-b border-gray-200">Item</th>
                <th className="text-left p-2 border-b border-gray-200">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td className="p-2 border-b border-gray-200">Distance (mi)</td>
                <td className="p-2 border-b border-gray-200">
                    {route.distance_final}
                </td>
                </tr>
                <tr>
                <td className="p-2 border-b border-gray-200">Loaded RPM ($/mi)</td>
                <td className="p-2 border-b border-gray-200">
                    {route.loaded_rpm}
                </td>
                </tr>
                <tr>
                <td className="p-2 border-b border-gray-200">Total Price ($)</td>
                <td className="p-2 border-b border-gray-200">
                    {route.total_price}
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        );
}

export default RateDetails