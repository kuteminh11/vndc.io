<?php

require __DIR__.'/ImgPicker.php';

$options = array(
    // Upload directory path.
    'upload_dir' => 'https://image.trustpay.vn/trustdex/',

    // Upload directory url.
    'upload_url' => 'https://image.trustpay.vn/trustdex/',

    // Image versions.
    'versions' => array(
        // This will create 2 image versions: the original one and a 200x200 one
        'avatar' => array(
            //'upload_dir' => '',
            //'upload_url' => '',
            // Create square image
            'crop' => true,
            'max_width' => 200,
            'max_height' => 200
        ),
    ),

    /**
     * Load callback.
     *
     * @return string|array
     */
    'load' => function () {
        // return 'avatar.jpg';
    },

    /**
     * Delete callback.
     *
     * @param  string $filename
     * @return bool
     */
    'delete' => function ($filename) {
        return true;
    },

    /**
     * Upload start callback.
     *
     * @param  stdClass $image
     * @return void
     */
    'upload_start' => function ($image) {
        $image->name = '~avatar_'.$_SESSION["login"].'.' . $image->type;
    },

    /**
     * Upload complete callback.
     *
     * @param  stdClass $image
     * @return void
     */
    'upload_complete' => function ($image) {
        
    },

    /**
     * Crop start callback.
     *
     * @param  stdClass $image
     * @return void
     */
    'crop_start' => function ($image) {
        $image->name = 'avatar_'.$_SESSION["login"].'.' . $image->type;
    },

    /**
     * Crop complete callback.
     *
     * @param  stdClass $image
     * @return void
     */
    'crop_complete' => function ($image) {

    }
);

// Create new ImgPicker instance.
new ImgPicker($options);
