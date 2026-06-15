import { supabase } from "@/lib/supabase";

export default async function AdminPage() {
const { data, error } = await supabase
.from("orders")
.select("*")
.order("created_at", { ascending: false });

if (error) {
return ( <div className="p-6"> <h1 className="text-3xl font-bold text-red-600">
Error Loading Orders </h1> <p className="text-black mt-2">
{error.message} </p> </div>
);
}

const totalOrders = data.length;

const totalRevenue = data.reduce(
(sum, order) => sum + Number(order.amount || 0),
0
);

return ( <div className="min-h-screen bg-gray-100 p-8">

```
  <div className="max-w-7xl mx-auto">

    <h1 className="text-5xl font-extrabold text-black mb-8">
      Orders Dashboard
    </h1>

    {/* STATS CARDS */}
    <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-2xl">

      <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-black uppercase tracking-wide">
          Total Orders
        </h3>

        <p className="text-6xl font-extrabold text-black mt-4">
          {totalOrders}
        </p>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-black uppercase tracking-wide">
          Revenue
        </h3>

        <p className="text-6xl font-extrabold text-green-600 mt-4">
          ₹{totalRevenue}
        </p>
      </div>

    </div>

    {/* TABLE */}
    <div className="bg-white border-2 border-black rounded-2xl shadow-lg overflow-x-auto">

      <table className="w-full">

        <thead className="bg-black text-white">
          <tr>
            <th className="p-5 text-left font-bold">Name</th>
            <th className="p-5 text-left font-bold">Phone</th>
            <th className="p-5 text-left font-bold">City</th>
            <th className="p-5 text-left font-bold">Amount</th>
            <th className="p-5 text-left font-bold">Status</th>
            <th className="p-5 text-left font-bold">Date & Time</th>
          </tr>
        </thead>

        <tbody>

          {data?.map((order) => (
            <tr
              key={order.id}
              className="border-b border-gray-200 hover:bg-yellow-50 transition"
            >
              <td className="p-5 text-black font-bold">
                {order.name}
              </td>

              <td className="p-5 text-black">
                {order.phone}
              </td>

              <td className="p-5 text-black">
                {order.city}
              </td>

              <td className="p-5 text-green-600 font-bold">
                ₹{order.amount}
              </td>

              <td className="p-5">
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {order.status}
                </span>
              </td>

              <td className="p-5 text-black">
                {new Date(order.created_at).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  </div>

</div>

);
}
