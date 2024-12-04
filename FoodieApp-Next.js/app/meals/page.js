import MealsGrid from "@/components/meals/meals.grid";
import classes from "./page.module.css";
import Link from "next/link";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delecious meals, created{" "}
          <span className={classes.highlight}>by you</span>
          <p>Choose your favourite recipe and cook it yourself. </p>
          <p className={classes.cta}>
            <Link href="/meals/share">Share your favourite recipe</Link>
          </p>
        </h1>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}