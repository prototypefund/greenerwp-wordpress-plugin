<?php
namespace LTWP\UI\Admin;

/**
 * Main admin page of LTWP.
 */
class Page {
  private $frontend = null;
  private $template_renderer = null;

	public function __construct( $frontend, $template_renderer ) {
    $this->frontend = $frontend;
    $this->template_renderer = $template_renderer;
	}

	public function run() {
		add_action( 'admin_menu', [ $this, 'add_admin_menu' ] );
    $this->frontend->enqueue_admin_script(
      'lowtechwp-ui-admin-page', 'ui/admin/page.js',
      [ 'wp-i18n', 'wp-api', 'wp-element', 'wp-data' ] );
    $this->frontend->enqueue_admin_style(
      'lowtechwp-ui-admin', 'admin.css');
  }

  public function add_admin_menu() {
    add_menu_page( __( 'LowTechWP', 'ltwp' ), __( 'LowTechWP', 'ltwp' ), 'manage_options', 'lowtechwp', [ $this, 'render' ] );
  }

  public function render() {
    $this->template_renderer->render( 'admin/page', [] );
  }
}
