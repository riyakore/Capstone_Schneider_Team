function CommodityDetails({route}) {
   return (
    <div className="bg-white border border-gray-300 rounded-lg p-4">
        <h2 className="text-xl font-bold mt-0">Commodity Detail</h2>
        <table className="w-full border-collapse mt-4">
            <thead>
            <tr>
                <th className="text-left p-2 border-b border-gray-200">Description</th>
                <th className="text-left p-2 border-b border-gray-200">Packaging Type</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="p-2 border-b border-gray-200">{route.commodityDescription}</td>
                <td className="p-2 border-b border-gray-200">{route.commodityPackaging}</td>
            </tr>
            </tbody>
        </table>
    </div>
   ) 
}

export default CommodityDetails;