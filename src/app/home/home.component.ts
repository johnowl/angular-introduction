import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { HousingLocation } from "../housing-location";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingService } from "../housing.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input
          type="text"
          placeholder="Filter"
          #filter
          (keyup)="filterResults(filter.value)"
        />
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }

  filterResults(query: string) {
    this.filteredLocationList = this.housingLocationList.filter(
      (location) =>
        location.city.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        location.state
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
        location.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }
}
