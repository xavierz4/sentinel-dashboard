import { EcommerceMetrics } from '../components/ecommerce/EcommerceMetrics';
import { MonthlySalesChart } from '../components/ecommerce/MonthlySalesChart';
import { MonthlyTarget } from '../components/ecommerce/MonthlyTarget';
import { StatisticsChart } from '../components/ecommerce/StatisticsChart';
import { DemographicCard } from '../components/ecommerce/DemographicCard';
import { RecentOrders } from '../components/ecommerce/RecentOrders';

export const DashboardPage = () => {
	return (
		<>
			<div className="grid grid-cols-12 gap-4 md:gap-6">
				<div className="col-span-12">
					<h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Sentinel Dashboard</h1>
					<EcommerceMetrics />
				</div>
				
				<div className="col-span-12 xl:col-span-8">
					<div className="bg-white dark:bg-boxdark rounded-2xl p-6 border border-stroke dark:border-strokedark h-96 flex items-center justify-center text-gray-400">
						[Gráfico de Consumo Real-Time - Gemini 3 Pro/Flash]
					</div>
				</div>

				<div className="col-span-12 xl:col-span-4">
					<div className="bg-white dark:bg-boxdark rounded-2xl p-6 border border-stroke dark:border-strokedark h-96 flex items-center justify-center text-gray-400">
						[Estado de Salud del Sistema - RBAC 8.8/10]
					</div>
				</div>
			</div>
		</>
	);
};
