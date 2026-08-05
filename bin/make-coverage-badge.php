<?php

/**
 * Get the gradient colors of the badge from the coverage percent
 *
 * @param  int  $coverage
 * @return array
 */
function get_badge_colors($coverage)
{
    if ($coverage < 60) {
        return ['#D73A49', '#CB2431'];
    } elseif ($coverage < 90) {
        return ['#FFD53D', '#B99614'];
    } else {
        return ['#34D058', '#28A745'];
    }
}

/**
 * Make a coverage badge
 *
 * @param  int  $coverage  Coverage percent
 * @param  string  $type  Type of coverage (supported values: "php", "ts")
 * @param  string|null (optional)  $filename  File where to write the badge
 * @param  string (optional)  $directory  Directory where to save the new file
 * @return void
 */
function make_coverage_badge($coverage, $type, $filename = null, $directory = 'docs')
{
    if (! isset($filename)) {
        $filename = "$type-coverage.svg";
    }

    $colors = get_badge_colors($coverage);

    // Write the badge in output buffer
    ob_start();

    ?>
<svg xmlns="http://www.w3.org/2000/svg" width="114" height="20">
    <title><?php echo strtoupper($type); ?> coverage - <?php echo $coverage; ?>%</title>
    <defs>
        <linearGradient id="workflow-fill" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop stop-color="#444D56" offset="0%" />
            <stop stop-color="#24292E" offset="100%" />
        </linearGradient>
        <linearGradient id="state-fill" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop stop-color="<?php echo $colors[0]; ?>" offset="0%" />
            <stop stop-color="<?php echo $colors[1]; ?>" offset="100%" />
        </linearGradient>
    </defs>
    <g>
        <rect rx="3" width="114" height="20" fill="url(#workflow-fill)" />
        <rect rx="3" x="79" width="35" height="20" fill="url(#state-fill)" />
        <path fill="url(#state-fill)" d="M79 0h4v20h-4z" />
        <rect rx="3" width="116" height="20" fill="url(#a)" />
        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
            <text x="49" y="15" fill="#010101" fill-opacity=".3" aria-hidden="true">coverage</text>
            <text x="49" y="14">coverage</text>
            <text x="97" y="15" fill="#010101" fill-opacity=".3" aria-hidden="true"><?php echo $coverage; ?>%</text>
            <text x="97" y="14"><?php echo $coverage; ?>%</text>
        </g>
<?php
            switch ($type) {
                case 'php':
                    include 'php-icon.php';
                    break;

                case 'ts':
                    include 'ts-icon.php';
                    break;

                default:
                    break;
            }
    ?>
    </g>
</svg>
<?php

    // Make docs dir if missing
    if (! is_dir($directory)) {
        mkdir($directory);
    }

    // Make the badge file
    file_put_contents($directory.DIRECTORY_SEPARATOR.$filename, ob_get_contents());

    // Close the output buffer
    ob_end_clean();
}
