<?php

$plugin['ui_admin_analysis_controller'] = function ( $plugin ) {
  return new GreenerWP\UI\Admin\AnalysisController(
		$plugin['analysis_checks']
	);
};

$plugin['ui_admin_dashboard_link'] = function ( $plugin ) {
  return new GreenerWP\UI\Admin\DashboardLink(
		$plugin['basename']
	);
};

$plugin['ui_admin_page'] = function ( $plugin ) {
  return new GreenerWP\UI\Admin\Page(
    $plugin[ 'frontend' ],
    $plugin[ 'template_renderer' ]
  );
};

$plugin['ui_admin_recipes'] = function ( $plugin ) {
  return new GreenerWP\UI\Admin\Recipes(
    $plugin[ 'frontend' ],
    $plugin[ 'template_renderer' ]
  );
};

$plugin['ui_admin_recipes_controller'] = function ( $plugin ) {
  return new GreenerWP\UI\Admin\RecipesController(
  );
};

$plugin['ui_admin_scanner_links'] = function ( $plugin ) {
  return new GreenerWP\UI\Admin\ScannerLinks();
};

$plugin['ui_admin_settings'] = function ( $plugin ) {
  return new GreenerWP\UI\Admin\Settings(
    $plugin[ 'frontend' ],
    $plugin[ 'template_renderer' ]
  );
};

$plugin['ui_admin_settings_controller'] = function ( $plugin ) {
  return new GreenerWP\UI\Admin\SettingsController(
  );
};

$plugin['ui_admin_statistics'] = function ( $plugin ) {
  return new GreenerWP\UI\Admin\Statistics(
    $plugin[ 'frontend' ],
    $plugin[ 'template_renderer' ]
  );
};

$plugin['ui_admin_statistics_controller'] = function ( $plugin ) {
  return new GreenerWP\UI\Admin\StatisticsController(
		$plugin['profiling_page_views']
	);
};
