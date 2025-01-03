export class Gift {
  private attributes: Map<string, string> = new Map<string, string>();
  private childName: string | undefined;

  constructor(
    private readonly name: string,
    private readonly weight: number,
    private readonly color: string,
    private readonly material: string
  ) {}

  public assignToChild(childName: string): void {
    this.childName = childName;
  }

  public addAttribute(key: string, value: string): void {
    this.attributes.set(key, value);
  }

  public getRecommendedAge(): number {
    const recommendedAge = this.attributes.get("recommendedAge");
    return recommendedAge ? parseInt(recommendedAge, 10) : 0;
  }

  public toString(): string {
    const childPart = this.childName ? ` FOR ${this.childName}` : "";
    return `A ${this.color}-colored ${this.name} weighing ${this.weight} kg made in ${this.material}${childPart}`;
  }
}
