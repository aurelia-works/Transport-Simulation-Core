import {Injectable, signal} from "@angular/core";
import {getCookie, setCookie} from "../data/utilities";

export const LINE_THICKNESS_MIN = 4;
export const LINE_THICKNESS_MAX = 16;
export const LINE_THICKNESS_DEFAULT = 10;
export const LABEL_DENSITY_MIN = 0;
export const LABEL_DENSITY_MAX = 100;
export const LABEL_DENSITY_DEFAULT = 50;

/** Map look settings kept in the map's own menu, remembered in cookies. */
@Injectable({providedIn: "root"})
export class MapSettingsService {
	/** Width of a route line in pixels. */
	public readonly lineThickness = signal(MapSettingsService.read("line_thickness", LINE_THICKNESS_MIN, LINE_THICKNESS_MAX, LINE_THICKNESS_DEFAULT));
	/** 0 hides every label that touches another one, 100 shows all of them. */
	public readonly labelDensity = signal(MapSettingsService.read("label_density", LABEL_DENSITY_MIN, LABEL_DENSITY_MAX, LABEL_DENSITY_DEFAULT));

	public setLineThickness(value: number) {
		this.lineThickness.set(value);
		setCookie("line_thickness", value.toString());
	}

	public setLabelDensity(value: number) {
		this.labelDensity.set(value);
		setCookie("label_density", value.toString());
	}

	private static read(name: string, min: number, max: number, fallback: number) {
		const value = parseInt(getCookie(name));
		return Number.isNaN(value) ? fallback : Math.min(max, Math.max(min, value));
	}
}
