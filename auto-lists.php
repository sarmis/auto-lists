<?php
/**
 * Plugin Name: Auto lists creator   
 * Author: Sarmis Thomas
 * Author URI: http://sarmis.gr
 * Version: 0.1
*/

function autolist_enqueue_resources() {    
	wp_enqueue_script('jquery'     , plugins_url('./jquery-2.0.3.min.js', __FILE__) );
	wp_enqueue_script('autolistsjs', plugins_url('./autolists.js' , __FILE__ ), array( 'jquery' ) );

	wp_enqueue_style('autolistscss', plugins_url('./autolists.css', __FILE__) );
}

function autolist_shortcode_handler( $atts, $content = null ) { 
        
    $ContainerClass = $atts[prefix] . "list";
	  
    return "<ol class='$ContainerClass' data-source='$atts[source]'></ol>" . 
           "<script>CreateAutoList(jQuery('.$ContainerClass'), '$atts[prefix]', ['" . str_replace(";", "','", $atts[items]) . "']);</script>";
}

add_action( 'wp_enqueue_scripts', 'autolist_enqueue_resources' );
add_shortcode( 'autolist', 'autolist_shortcode_handler' );
?>