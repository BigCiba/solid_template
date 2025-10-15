export function CustomTooltip(sName: string, data: any) {
    return {
        onmouseover: (p: Panel) => {
            ShowCustomTooltip(p, sName, data);
        },
        onmouseout: (p: Panel) => {
            HideCustomTooltip(p, sName);
        }
    }
}