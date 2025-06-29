import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"
import App from "../src/App"
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../src/contexts/ThemeContext"
import { HeroUIProvider } from "@heroui/react";
import axios from "axios"


vi.mock("axios", () => ({
    default: {
        get: vi.fn(),
    },
}));

describe("App Component", () => {
    it("Should render the star background component",  async () => {
        (axios as any).get.mockResolvedValue({
            data: [], 
        });

        render(
            <ThemeProvider>
                <HeroUIProvider>
                    <MemoryRouter>
                        <App />
                    </MemoryRouter>
                </HeroUIProvider>
            </ThemeProvider>
        )
        
        expect(screen.getByTestId("star-background")).toBeInTheDocument();
        
        const stars = await screen.findAllByTestId(/^star-test-id-\d+$/);

        expect(stars.length).toBeGreaterThan(0);
        stars.forEach(star => {
            expect(star).toBeInTheDocument();
        })

        const meteors = await screen.findAllByTestId(/^meteor-test-id-\d+$/)
        
        expect(meteors.length).toBeGreaterThan(0);
        meteors.forEach(meteor => {
            expect(meteor).toBeInTheDocument();
        })
    });
    it("Should render Navbar", () => {
        (axios as any).get.mockResolvedValue({
            data: [], 
        });

        render(
            <ThemeProvider>
                <HeroUIProvider>
                    <MemoryRouter>
                        <App />
                    </MemoryRouter>
                </HeroUIProvider>
            </ThemeProvider>
        )

        expect(screen.getByTestId("navbar")).toBeInTheDocument();
    });
})

describe("App Routing", () => {
    it("renders Home component on default route '/'", async () => {
        (axios as any).get.mockResolvedValue({
            data: [], 
        });
        
        render(
            <ThemeProvider>
                <HeroUIProvider>
                    <MemoryRouter initialEntries={["/"]}>
                        <App />
                    </MemoryRouter>
                </HeroUIProvider>
            </ThemeProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId("apod-viewer-container")).toBeInTheDocument();
        })
    });

    it("renders MarsRoverPage component on route '/MRP'", () => {
        render(
            <ThemeProvider>
                <HeroUIProvider>
                    <MemoryRouter initialEntries={["/MRP"]}>
                        <App />
                    </MemoryRouter>
                </HeroUIProvider>
            </ThemeProvider>
        );

        expect(screen.getByTestId("mars-rover-viewer-container")).toBeInTheDocument();
    });

    it("renders NearEarthObjectPage component on route '/NeoWs'", () => {
        render(
            <ThemeProvider>
                <HeroUIProvider>
                    <MemoryRouter initialEntries={["/NeoWs"]}>
                        <App />
                    </MemoryRouter>
                </HeroUIProvider>
            </ThemeProvider>
        );

        expect(screen.getByTestId("near-earth-object-viewer")).toBeInTheDocument();
    });

    it("renders fallback for unknown routes", () => {
        render(
            <ThemeProvider>
                <HeroUIProvider>
                    <MemoryRouter initialEntries={["/random/path"]}>
                        <App />
                    </MemoryRouter>
                </HeroUIProvider>
            </ThemeProvider>
        );

        expect(screen.getByText(/Not found/i)).toBeInTheDocument();
    });
});