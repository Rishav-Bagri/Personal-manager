import { FeatureCard } from "../components/FeatureCard";

export function Features(){
    return <div className="mt-10" >
        <div className="flex justify-center text-pink-500 text-5xl font-bold">
            Features
        </div>
        <div className="p-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <FeatureCard title="Bucket List" details="stores ur bucket list for this year" to="/bucket-list"></FeatureCard>
            <FeatureCard title="Budget tracker" details="stores ur budgetand calculate it"  to="/budget-tracker"></FeatureCard>
            <FeatureCard title="notepad" details="takes notes"  to="/notepad"></FeatureCard>
            <FeatureCard title="password manager" details="stores ur passwords"  to="/password-manager"></FeatureCard>
            <FeatureCard title="reminders" details="reminds u of ur remindders"  to="/reminders"></FeatureCard>
            <FeatureCard title="tasks" details="stores ur task for The day"  to="/tasks"></FeatureCard>
        </div>
    </div>
}