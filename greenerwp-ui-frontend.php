<?php

namespace GreenerWP\UI\Frontend;

$plugin['ui_frontend_profiler_controller'] = function ( $plugin ) {
  return new ProfilerController( $plugin['profiling_page_views'] );
};

$plugin['ui_frontend_tweaks_disable_web_fonts'] = function ( $plugin ) {
  return new Tweaks\DisableWebFonts();
};

$plugin['ui_frontend_tweaks_jpeg_quality'] = function ( $plugin ) {
  return new Tweaks\JPEGQuality();
};

$plugin['ui_frontend_tweaks_plugins_wpcf7'] = function ( $plugin ) {
  return new Tweaks\Plugins\WPCF7();
};

$plugin['ui_frontend_widgets_awareness'] = function ( $plugin ) {
  return new Widgets\Awareness(
		$plugin['template_renderer']
  );
};