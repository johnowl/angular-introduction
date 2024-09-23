import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { HousingLocation } from "../housing-location";
import { HousingService } from "../housing.service";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: ` <article>
    <img
      class="listing-photo"
      [src]="housingLocation?.photo"
      alt="Exterior photo of {{ housingLocation?.name }}"
    />
    <section class="list-description">
      <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
      <p class="listing-location">
        {{ housingLocation?.city }}, {{ housingLocation?.state }}
      </p>
    </section>

    <section class="listing-features">
      <h2 class="section-heading">About this housing locations</h2>
      <ul>
        <li>Units available: {{ housingLocation?.availableUnits }}</li>
        <li>Wifi: {{ housingLocation?.wifi ? "Yes" : "No" }}</li>
        <li>Laundry: {{ housingLocation?.laundry ? "Yes" : "No" }}</li>
      </ul>
    </section>

    <section class="listing-apply">
      <h2 class="section-heading">Apply to live here</h2>

      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First name:</label>
        <input type="text" id="first-name" formControlName="firstName" />

        <label for="last-name">Last name:</label>
        <input type="text" id="last-name" formControlName="lastName" />

        <label for="email">Email:</label>
        <input type="email" id="email" formControlName="email" />

        <button class="primary" type="submit">Apply now</button>
      </form>
    </section>
  </article>`,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => (this.housingLocation = housingLocation));
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }
}
