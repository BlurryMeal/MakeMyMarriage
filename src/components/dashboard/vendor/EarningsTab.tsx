
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface EarningsData {
  total: string;
  pending: string;
  monthlyData: { month: string; amount: number }[];
}

const EarningsTab = ({ earnings }: { earnings: EarningsData }) => {
  const chartConfig = {
    earnings: {
      label: "Monthly Earnings",
      theme: {
        light: "#e11d48",
        dark: "#e11d48"
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{earnings.total}</p>
            <p className="text-sm text-green-600">+24% from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{earnings.pending}</p>
            <p className="text-sm text-gray-600">From 4 bookings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹24,000</p>
            <p className="text-sm text-green-600">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Earnings</CardTitle>
          <CardDescription>Your earnings over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <BarChart data={earnings.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                      labelFormatter={(label) => `${label} 2023`}
                    />
                  } 
                />
                <Bar 
                  dataKey="amount" 
                  fill="var(--color-earnings)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30} 
                  name="Earnings"
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsTab;
