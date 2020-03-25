<?php

return [
    'defaultProfile' => 'standard',

    'fieldProfiles' => [
        'standard' => [
            'title' => ['fieldSeoTitle', 'fieldHead', 'fieldHeading', 'fieldTitle', 'title'],
            'description' => ['fieldSeoDescription', 'fieldLead', 'fieldLeadtext', 'summary'],
            'image' => ['fieldSeoImageAsset', 'fieldHeroImageAsset']
        ]
    ],
];