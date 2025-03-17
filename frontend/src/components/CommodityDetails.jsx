function CommodityDetails({route}) {
return (
    <div className="bg-white border border-gray-300 rounded-lg p-4">
        <h2 className="text-xl font-bold mt-0">Commodity Details</h2>
        <table className="w-full border-collapse mt-4">
            <thead>
            <tr>
                <th className="text-left p-2 border-b border-gray-200">Hazardous</th>
                <th className="text-left p-2 border-b border-gray-200">High Value</th>
                <th className="text-left p-2 border-b border-gray-200">Temperature Controlled</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="p-2 border-b border-gray-200">
                    {route.is_hazardous ? "Yes" : "No"}
                </td>
                <td className="p-2 border-b border-gray-200">
                    {route.is_high_value ? "Yes" : "No"}
                </td>
                <td className="p-2 border-b border-gray-200">
                    {route.is_temperature_controlled ? "Yes" : "No"}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
) 
}

export default CommodityDetails;