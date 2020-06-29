namespace Angular_ASPNETCore_CustomersService.Models.SIMCards
{
    public class SIMCard
    {
        public int Id { get; set; }
        public string CCID { get; set; }
        public string Number { get; set; }
        public bool Activated { get; set; }
        public int ServiceProvider { get; set; }
    }
}
