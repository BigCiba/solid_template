type VCSSStyleOverflow = 'squish' | 'clip' | 'scroll' | 'noclip' | null;
declare interface VCSSStyleDeclaration {
    /**
     * Specifies what to do with contents that overflow the available space for the panel. Possible values:
     * "squish" - Children are squished to fit within the panel's bounds if needed (default)
     * "clip" - Children maintain their desired size but their contents are clipped
     * "scroll" - Children maintain their desired size and a scrollbar is added to this panel
     *
     * Examples:
     * overflow: squish squish; // squishes contents in horizontal and vertical directions
     * overflow: squish scroll; // scrolls contents in the Y direction
     */
    overflow: VCSSStyleOverflow | `${VCSSStyleOverflow} ${VCSSStyleOverflow}`;

}
