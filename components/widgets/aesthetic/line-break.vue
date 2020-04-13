<template>
<svg  viewBox="0 0 91 7" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
v-if="fancy">
    <g transform="matrix(1,0,0,1,-3673.91,-2141.41)">
        <g transform="matrix(1.03506,0,0,3.58793,1766.14,1587.17)">
            <g transform="matrix(0.183538,0,0,0.0629121,1527.65,147.341)">
                <g transform="matrix(0.365176,0,0,1.66576,1102.12,-480.826)">
                    <path d="M2234,365L1692,365" style="fill:none;stroke:rgb(244,222,167);stroke-width:1.39px;"/>
                </g>
                <g transform="matrix(0.365176,0,0,1.66576,1381.2,-480.826)">
                    <path d="M2234,365L1692,365" style="fill:none;stroke:rgb(244,222,167);stroke-width:1.39px;"/>
                </g>
                <g transform="matrix(1.39954,1.17787,-1.39954,1.17787,-428.57,-2743.29)">
                    <rect x="2066" y="360" width="11" height="11" style="fill:none;stroke:rgb(244,222,167);stroke-width:1px;"/>
                </g>
                <g transform="matrix(0.539796,0.454298,-0.539796,0.454298,1038.16,-979.948)">
                    <rect x="2066" y="360" width="11" height="11" style="fill:none;stroke:rgb(244,222,167);stroke-width:2.59px;"/>
                </g>
                <g transform="matrix(-0.629762,0.530015,-0.629762,-0.530015,3520.94,-777.028)">
                    <rect x="2066" y="360" width="11" height="11" style="fill:none;stroke:rgb(244,222,167);stroke-width:2.22px;"/>
                </g>
                <g transform="matrix(-0.629762,0.530015,-0.629762,-0.530015,3465.52,-777.028)">
                    <rect x="2066" y="360" width="11" height="11" style="fill:none;stroke:rgb(244,222,167);stroke-width:2.22px;"/>
                </g>
            </g>
        </g>
    </g>
</svg>
<hr v-else :style="{ 'border-color': color }">
</template>

<script>
export default {
    props: {
        fancy: {
            type: Boolean,
            default: false,
        },
        color: String,
    }
}
</script>