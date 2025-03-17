function RateDetails({route}) {
    return(
        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mt-0">Rate Details</h2>
            <table className="w-full border-collapse mt-4">
                <thead>
                    <tr>
                        <th className="text-left p-2 border-b border-gray-200">Rate Details</th>
                        <th className="text-left p-2 border-b border-gray-200">Total</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                  <td className="p-2 border-b border-gray-200">Base Rate</td>
                  <td className="p-2 border-b border-gray-200">{route.rateTotal}</td>
                </tr>
              </tbody>
            </table>
        </div>
    )
}

export default RateDetails