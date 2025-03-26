// components/BuyMeACoffeeWidget.tsx
"use client";
import { useEffect } from "react";
import { useBoomerMode } from "@/components/BoomerModeProvider"; // if using context

const BuyMeACoffeeWidget = () => {
    const { boomerMode } = useBoomerMode();

    useEffect(() => {
        const scriptId = "bmc-widget-script";

        if (document.getElementById(scriptId)) return;

        const script = document.createElement("script");
        script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
        script.id = scriptId;
        script.async = true;

        script.setAttribute("data-name", "BMC-Widget");
        script.setAttribute("data-id", "anoah1225v");
        script.setAttribute("data-description", boomerMode ? "Back in my day, we mailed support tickets..." : "Support me on Buy me a coffee!");
        script.setAttribute("data-message", boomerMode ? "Support this young whippersnapper!" : "Support me - Buy me a coffee!");
        script.setAttribute("data-color", boomerMode ? "#8B5CF6" : "#FFDD00");
        script.setAttribute("data-position", "Right");
        script.setAttribute("data-x_margin", "18");
        script.setAttribute("data-y_margin", "18");
        script.setAttribute('data-position', 'Right');

        script.onload = () => {
            const evt = document.createEvent("Event");
            evt.initEvent("DOMContentLoaded", false, false);
            window.dispatchEvent(evt);
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup script and widget
            document.getElementById(scriptId)?.remove();
            document.getElementById("bmc-wbtn")?.remove();
        };
    }, [boomerMode]);

    return null;
};

export default BuyMeACoffeeWidget;
