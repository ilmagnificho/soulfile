// Fortune Content Engine - Real 2026 Predictions by Element

export interface Fortune {
    wealth: string;
    love: string;
    danger: string;
    health: string;
    career: string;
    lucky_dates: string[];
    unlucky_dates: string[];
    lucky_colors: string[];
    talisman: string;
}

const fortunes: Record<string, Fortune> = {
    fire: {
        wealth: "2026 brings powerful financial momentum for Fire souls. Jupiter's transit through your wealth sector (March-August) creates exceptional opportunities in technology, energy, and leadership roles. A significant investment opportunity emerges around May 15th - trust your instincts. Avoid speculative ventures in October when Mars squares your financial houses.",
        love: "Your passionate nature attracts intense connections in 2026. Single Fire souls may meet a transformative partner during the Lunar New Year period (late January). Existing relationships deepen through shared adventures. Warning: April's Venus retrograde tests patience - avoid ultimatums. Summer brings harmonious energy for commitments.",
        danger: "CRITICAL WARNING: The period between September 12-28, 2026 shows extremely challenging planetary alignments for Fire elements. Avoid major travel, surgery, and confrontations during this window. Your natural impulsiveness is heightened - practice conscious restraint. Legal matters should be postponed until October 5th.",
        health: "Fire's vitality is strong in 2026, but watch for burnout symptoms from March-May. Heart and circulation require attention - incorporate cardio and stress management. Avoid excessive alcohol during summer social season. Autumn brings renewed energy.",
        career: "Leadership opportunities multiply in 2026. A promotion or significant role change is likely by Q2. Your boldness is rewarded, but diplomatic communication is essential in July when workplace tensions peak. Consider mentorship roles - teaching others amplifies your success.",
        lucky_dates: ["January 28", "March 15", "May 22", "August 8", "November 11"],
        unlucky_dates: ["April 7", "September 12-28", "December 3"],
        lucky_colors: ["Crimson Red", "Gold", "Orange"],
        talisman: "Carry a piece of carnelian or red jasper. Place near your workspace for amplified success energy."
    },
    water: {
        wealth: "2026 favors Water elements in creative and healing industries. Neptune's harmonious aspect brings unexpected income through artistic pursuits, counseling, or wellness services. Real estate investments made before June show excellent returns. Be cautious with joint finances in August - ensure clear contracts.",
        love: "Emotional depth attracts soul-level connections in 2026. A significant relationship begins through spiritual or artistic communities around February-March. Existing partnerships benefit from vulnerability and honest communication. The August Full Moon brings clarity about long-term compatibility.",
        danger: "CRITICAL WARNING: Water souls face heightened emotional sensitivity during the March 25 - April 10 period. Avoid major decisions during this fog of confusion. Travel near large bodies of water requires extra caution in July. Trust issues surface in relationships - address them directly rather than retreating.",
        health: "Lymphatic and immune systems need support in 2026. Water retention and kidney function require attention - stay hydrated with clean, filtered water. Emotional health directly impacts physical wellbeing. Therapy or counseling in spring prevents autumn depression.",
        career: "Creative and healing professions flourish. A career pivot toward more meaningful work is supported throughout 2026. Collaboration over competition brings success. Avoid workplace politics in June - stay above the drama. Remote work opportunities expand.",
        lucky_dates: ["February 14", "April 22", "June 21", "September 9", "December 21"],
        unlucky_dates: ["March 25 - April 10", "July 17", "November 8"],
        lucky_colors: ["Deep Blue", "Silver", "Turquoise"],
        talisman: "Moonstone or aquamarine worn as jewelry enhances intuition and protection throughout 2026."
    },
    wood: {
        wealth: "Growth-oriented investments thrive for Wood souls in 2026. Green technology, sustainable businesses, and education sectors offer exceptional returns. A business partnership formed in spring proves highly profitable. Avoid risky ventures in Q4 - consolidate gains instead.",
        love: "Wood's gentle nature attracts nurturing relationships in 2026. Family connections deepen, and for singles, love often arrives through community service or environmental causes. Patience is rewarded - avoid rushing commitment before September. Existing couples benefit from shared growth projects.",
        danger: "CRITICAL WARNING: The period from June 15-30 brings challenges related to family conflicts and property disputes. Legal matters involving inheritance or real estate require careful handling. Avoid signing contracts during this window. Liver and gallbladder health need monitoring.",
        health: "Liver health is your focus for 2026 - reduce processed foods and alcohol, especially in spring. Eye strain from screens requires attention. Forest bathing and time in nature are essential medicine. Spring allergies may be more intense than usual.",
        career: "Teaching, mentoring, and educational roles expand significantly. A book, course, or knowledge-sharing venture succeeds in 2026. Avoid impatience with slow progress in Q1 - the seeds you plant bloom by autumn. International opportunities emerge through academic connections.",
        lucky_dates: ["March 20", "May 5", "July 7", "September 23", "November 27"],
        unlucky_dates: ["June 15-30", "August 12", "October 31"],
        lucky_colors: ["Forest Green", "Brown", "Teal"],
        talisman: "Jade or green aventurine promotes prosperity and health. Keep a small plant in your workspace."
    },
    metal: {
        wealth: "Precision and discipline reward Metal souls financially in 2026. Technology investments, particularly in AI and automation, show strong returns. A structured savings plan established in January compounds significantly. Avoid emotional spending during Venus retrograde (April). Inheritance or asset restructuring favors you in autumn.",
        love: "Metal's discerning nature attracts quality over quantity in relationships. A significant connection develops through professional networks or structured activities (fitness, courses). Vulnerability is your growth edge - allow emotional expression. Autumn brings deepening intimacy for couples.",
        danger: "CRITICAL WARNING: Respiratory and skin health require vigilance from October 15 - November 15. Avoid exposure to pollution and allergens. Business partnerships formed in haste during July may prove problematic - conduct thorough due diligence. Guard against isolation and rigidity.",
        health: "Lungs, skin, and large intestine need support in 2026. Breathwork practices transform your wellbeing. Reduce dairy if experiencing congestion. Autumn dryness affects you strongly - hydrate internally and externally. Grief from past losses may surface for healing.",
        career: "Technical expertise and attention to detail open doors in 2026. A leadership position in systems, finance, or engineering is likely by mid-year. Perfectionism is an asset but avoid analysis paralysis. Networking in unconventional settings yields surprising opportunities.",
        lucky_dates: ["February 8", "April 4", "July 21", "October 8", "December 12"],
        unlucky_dates: ["July 10-17", "October 15 - November 15", "December 30"],
        lucky_colors: ["White", "Silver", "Gold", "Gray"],
        talisman: "Clear quartz or white jade amplifies clarity and attracts prosperity. Wear metal jewelry intentionally."
    },
    earth: {
        wealth: "Stability-focused investments reward Earth souls in 2026. Real estate, agriculture, and infrastructure projects show excellent long-term returns. A significant property opportunity arises in May - act decisively. Avoid lending money to friends in March. Build emergency reserves for unexpected Q4 expenses.",
        love: "Earth's nurturing presence attracts committed, long-term partners in 2026. For singles, love arrives through family introductions or comfortable, familiar settings. Existing relationships deepen through shared domestic projects. Avoid stubbornness in June - flexibility strengthens bonds.",
        danger: "CRITICAL WARNING: Digestive and metabolic health require attention from August 1-20. Avoid major dietary changes during this period. Property or boundary disputes may arise with neighbors - address them diplomatically. Overthinking creates obstacles - trust your grounded instincts.",
        health: "Stomach, spleen, and digestive system are 2026 focus areas. Regular meal times and mindful eating transform health. Muscle and joint issues respond well to consistent, moderate exercise. Worry and overthinking directly impact digestion - practice grounding techniques.",
        career: "Building and management roles expand in 2026. Your reliability earns recognition and advancement in existing organizations. A side business related to property, food, or wellness gains traction. Delegate to avoid overwhelm by Q3. Long-term planning beats quick wins.",
        lucky_dates: ["January 15", "April 18", "June 6", "August 28", "October 10"],
        unlucky_dates: ["March 3", "August 1-20", "November 23"],
        lucky_colors: ["Yellow", "Brown", "Terracotta", "Ochre"],
        talisman: "Tiger's eye or yellow jasper promotes stability and attracts abundance. Keep crystals in your home's center."
    }
};

export function getFortune(element: string): Fortune {
    const key = element.toLowerCase();
    return fortunes[key] || fortunes.earth; // Default to earth if unknown
}

export function getRedactedPreview(fortune: Fortune): { danger: string; teaser: string } {
    // Create redacted version of danger text for teaser
    const words = fortune.danger.split(' ');
    const redactedDanger = words.map((word, i) => {
        // Keep some words, redact others for intrigue
        if (i % 4 === 0 || word.includes('WARNING') || word.includes('CRITICAL') || word.includes('2026')) {
            return word;
        }
        if (word.length > 4) {
            return '████';
        }
        return word;
    }).join(' ');

    const teaser = `${redactedDanger}\n\n[ENCRYPTED: Wealth Analysis, Love Compatibility, Lucky Dates, and Protective Talisman Information]`;

    return { danger: redactedDanger, teaser };
}
