// Element calculation utility based on birth year
export type Element = "fire" | "water" | "wood" | "metal" | "earth";

export interface ElementData {
    element: Element;
    color: string;
    emoji: string;
    description: string;
    traits: string[];
}

export function calculateElement(birthDate: string): ElementData {
    const year = new Date(birthDate).getFullYear();
    const lastDigit = year % 10;

    // Based on traditional Chinese/Korean Five Elements (Wu Xing)
    // Simplified calculation using last digit of year
    const elementMap: { [key: number]: ElementData } = {
        0: {
            element: "metal",
            color: "text-zinc-300",
            emoji: "⚔️",
            description: "Strong-willed and determined",
            traits: ["Resilient", "Ambitious", "Disciplined"],
        },
        1: {
            element: "metal",
            color: "text-zinc-300",
            emoji: "⚔️",
            description: "Strong-willed and determined",
            traits: ["Resilient", "Ambitious", "Disciplined"],
        },
        2: {
            element: "water",
            color: "text-blue-400",
            emoji: "🌊",
            description: "Flowing and adaptive",
            traits: ["Intuitive", "Flexible", "Wise"],
        },
        3: {
            element: "water",
            color: "text-blue-400",
            emoji: "🌊",
            description: "Flowing and adaptive",
            traits: ["Intuitive", "Flexible", "Wise"],
        },
        4: {
            element: "wood",
            color: "text-green-400",
            emoji: "🌲",
            description: "Growing and expansive",
            traits: ["Creative", "Compassionate", "Generous"],
        },
        5: {
            element: "wood",
            color: "text-green-400",
            emoji: "🌲",
            description: "Growing and expansive",
            traits: ["Creative", "Compassionate", "Generous"],
        },
        6: {
            element: "fire",
            color: "text-red-500",
            emoji: "🔥",
            description: "Passionate and dynamic",
            traits: ["Energetic", "Leader", "Charismatic"],
        },
        7: {
            element: "fire",
            color: "text-red-500",
            emoji: "🔥",
            description: "Passionate and dynamic",
            traits: ["Energetic", "Leader", "Charismatic"],
        },
        8: {
            element: "earth",
            color: "text-amber-600",
            emoji: "⛰️",
            description: "Stable and grounded",
            traits: ["Practical", "Reliable", "Patient"],
        },
        9: {
            element: "earth",
            color: "text-amber-600",
            emoji: "⛰️",
            description: "Stable and grounded",
            traits: ["Practical", "Reliable", "Patient"],
        },
    };

    return elementMap[lastDigit];
}
