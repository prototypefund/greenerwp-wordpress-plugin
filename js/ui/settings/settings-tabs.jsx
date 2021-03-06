import FrontendTweaksTab from './frontend-tweaks-tab.jsx';
import PluginTweaksTab from './plugin-tweaks-tab.jsx';
import StatisticsTab from './statistics-tab.jsx';
const { Button, TabPanel } = wp.components;

const { __, _x, _n, _nx } = wp.i18n;

const SettingsTabs = ( props ) => {
	var tabs = {
		"statistics": {
			tab: <StatisticsTab {...props}/>,
			label: __( 'Statistics', 'greenerwp' ),
		},
		"frontend-tweaks": {
			tab: <FrontendTweaksTab {...props}/>,
			label: __( 'Frontend tweaks', 'greenerwp' ),
		},
		"plugins": {
			tab: <PluginTweaksTab {...props}/>,
			label: __( 'Plugin Tweaks', 'greenerwp' ),
		},
	};

	var panel = (
		<TabPanel className="my-tab-panel"
			activeClass="active-tab"
			/* onSelect={ onSelect } */
			tabs={ Object.keys( tabs ).map( ( key ) => {
				return {
					name: key,
					title: tabs[key].label,
					className: 'button tab-' + key,
				};
			} ) }>
			{
				( tab ) => <p>{ tabs[tab.name].tab }</p>
			}
		</TabPanel>
	);
	return (
		<div>
			{ props.isLoading && (
					<p>
						{__( 'Loading settings...', 'greenerwp' )}
					</p>
			) }
			{ props.hasError && (
					<p>
						{__( 'Could not load saved settings.', 'greenerwp' )}
					</p>
			) }
			{ ! props.isLoading && ! props.hasError && panel }
			<Button isPrimary disabled={props.isSaving} isBusy={props.isSaving} onClick={props.saveSettings}>
				{ __( 'Save', 'greenerwp' ) }
			</Button>
		</div>
	);
};

export default SettingsTabs;
