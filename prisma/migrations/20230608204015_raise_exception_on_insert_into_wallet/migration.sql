-- Create Function
CREATE FUNCTION do_not_allow_insert_on_wallet()
  RETURNS trigger AS
$func$
BEGIN
   RAISE EXCEPTION 'Wallet table cannot have more than one row';
   RETURN NEW;
END
$func$  LANGUAGE plpgsql;

-- Create Trigger
CREATE TRIGGER insbef_wallet_check
BEFORE INSERT ON "wallet"
FOR EACH ROW EXECUTE PROCEDURE do_not_allow_insert_on_wallet();