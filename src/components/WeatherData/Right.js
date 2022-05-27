import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import WeatherDataToday from './Right/Today';
import WeatherDataWeek from './Right/Week';
import WeatherDataHour from './Right/Hour';

function Right() {

	return(
		<div>
			<Tabs>
				<TabList>
					<Tab>Today</Tab>
					<Tab>Week</Tab>
					<Tab>Hour</Tab>
				</TabList>
				<TabPanel>
					<WeatherDataToday/>
				</TabPanel>
				<TabPanel>
					<WeatherDataWeek/>
				</TabPanel>
				<TabPanel>
					<WeatherDataHour/>
				</TabPanel>
			</Tabs>
		</div>
	)
}

export default (Right)
